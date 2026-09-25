import { projectApi, type ProjectFilters } from "@/services/projectApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateProjectDto, UpdateProjectDto } from "@/types/project"

export function useProjects(filters?: ProjectFilters) {
  const queryClient = useQueryClient()

  const projectsQuery = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => projectApi.getAll(filters),
    placeholderData: (prev) => prev,
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectDto) => projectApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  return {
    projects: projectsQuery.data?.data ?? [],
    total: projectsQuery.data?.total ?? 0,
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    refetch: projectsQuery.refetch,
  }
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectApi.getById(id),
    enabled: !!id,
  })
}
