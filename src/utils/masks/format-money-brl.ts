export const formatMoneyBrl = (money: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(money / 100);
};
