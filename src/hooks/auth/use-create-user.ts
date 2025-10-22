import { useAuthStore } from "@/zustand/auth-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateUser = () => {
  const { register } = useAuthStore();
  const { mutateAsync } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      await register(name, email, password);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Cadastro efetuado com sucesso!");
    },
  });
  return { mutateAsync };
};

export { useCreateUser };
