import { useInvest } from "@/app/lender/invest/hooks";
import { AttachMoney } from "@mui/icons-material";
import PillButton from "@/components/atoms/PillButton";

export const InvestConfirmation = () => {
  const { amount } = useInvest();
  return (
    <PillButton
      startIcon={<AttachMoney />}
      disabled={amount <= 0 || amount == null}
      sx={{
        borderRadius: 3,
        backgroundColor: "#15803D",
        color: "#FFFFFF",
        width: "100%",
      }}
    >
      Confirmar Inversíon
    </PillButton>
  );
};
