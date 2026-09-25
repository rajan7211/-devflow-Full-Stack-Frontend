import { userApi } from "@/services/userApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useUsers() {
  const queryClient = useQueryClient()

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAll(),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      userApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      userApi.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    users: usersQuery.data?.data ?? [],
    total: usersQuery.data?.total ?? 0,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    updateStatus: updateStatusMutation.mutateAsync,
    updateRole: updateRoleMutation.mutateAsync,
    refetch: usersQuery.refetch,
  }
}
