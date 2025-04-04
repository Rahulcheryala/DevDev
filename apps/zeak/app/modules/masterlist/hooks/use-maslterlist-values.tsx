import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useMasterlistStore } from "./use-masterlist-store";

type CreateMasterlistValuePayload = {
    displayName: string;
    meaning: string;
    value: string;
    isActive: boolean;
    userId: string;
    editable: boolean;
    isDefault: boolean;
}

export const useMasterlistValues = (id: string | null) => {
    return useQuery({
        queryKey: ["masterlist-values", id],
        queryFn: () => axios.get(`/api/masterlist/${id}/values`).then((res) => res.data),
        enabled: !!id
    })
}

export const useCreateMasterlistValue = (masterListId: string, onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    const { setIsCreateNewValueActive } = useMasterlistStore()

    return useMutation({
        mutationFn: async (data: CreateMasterlistValuePayload) => {
            const response = await axios.post(`/api/masterlist/${masterListId}/values`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["masterlist-values", masterListId] });
            toast.success("Value created successfully");
            setIsCreateNewValueActive(false)
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create value");
        }
    });
}
