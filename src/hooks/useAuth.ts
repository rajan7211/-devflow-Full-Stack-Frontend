import { authApi } from "@/services/authApi"
import { useAuthStore } from "@/store/authStore"
import type { LoginDto, RegisterDto } from "@/types/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, setLoading } = useAuthStore()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
    onSettled: () => setLoading(false),
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
    onSettled: () => setLoading(false),
  })

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout()
      queryClient.clear()
    },
    onError: () => {
      // Even if API fails, clear local state
      logout()
      queryClient.clear()
    },
  })

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
    enabled: !!token && !user,
    retry: false,
  })

  return {
    user,
    token,
    isAuthenticated,
    isLoading: useAuthStore((s) => s.isLoading) || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    meQuery,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}
