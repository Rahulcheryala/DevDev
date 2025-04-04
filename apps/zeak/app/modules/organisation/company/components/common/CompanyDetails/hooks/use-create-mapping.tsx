import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMasterlistStore } from "./use-masterlist-store";
interface CreateMappingData {
    companyId: string;
    status: boolean;
    userId: string;
}

export function useCreateMapping(masterListId: string, onSuccess?: () => void) {
    const queryClient = useQueryClient();
    const { setIsCreateNewMappingRow } = useMasterlistStore();
    return useMutation({
        mutationFn: async (data: CreateMappingData) => {
            const response = await axios.post(`/api/masterlist/${masterListId}/mapping`, {
                data: {
                    masterListId,
                    companyId: data.companyId,
                    status: data.status,
                    userId: data.userId
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["masterlist-details", masterListId] });
            setIsCreateNewMappingRow(false);
            if (onSuccess) {
                onSuccess();
            }
        }
    });
}
