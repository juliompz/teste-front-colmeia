import { useAuthStore } from "@/zustand/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const queryParams = useSearchParams();
  const redirect = queryParams.get("redirectTo");

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
      if (redirect) {
        push(redirect);
        return;
      }
      push("/");
    },
  });
};

export { useLogin };
