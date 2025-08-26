import { useWalletAccount } from "@/hooks/useWalletAccount";
import { ContractCallProps } from "@/types/contract.interface";
import { getReferralTag, submitReferral } from "@divvi/referral-sdk";

export const contractWrite = async ({
  ContractAddress,
  abi,
  functionName,
  args = [],
}: ContractCallProps) => {
    
  const { client, user } = useWalletAccount();  
    
  try {
    if (!ContractAddress || !abi || !functionName) {
      throw new Error("Missing required contract parameters");
    }

    if (!client || !user) {
      throw new Error("Wallet not connected");
    }

    const referralTag = getReferralTag({
      user,
      consumer: process.env.NEXT_PUBLIC_DIVVI_CONSUMER as `0x${string}`,
    });

    const txHash = await client.writeContract({
      address: ContractAddress,
      abi,
      functionName,
      args,
      account: user,
      dataSuffix: `0x${referralTag}`,
    });
    
    const chainId = await client.getChainId();
    
    await submitReferral({
      txHash,
      chainId,
    });

    return txHash;
  } catch (error) {
    console.error("Contract write error:", error);
    throw error;
  }
};
