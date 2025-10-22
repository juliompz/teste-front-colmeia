import { useAuthStore } from "@/zustand/auth-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const { login } = useAuthStore();
  const { push } = useRouter();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await login(email, password);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Login efetuado com sucesso!");
      push("/");
    },
  });
};

export { useLogin };
