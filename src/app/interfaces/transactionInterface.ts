// Representar as transações (tipos de transações)
export enum TransactionStatus {
  PENDING = "PENDING",
  CAPTURED = "CAPTURED",
  CANCELLED = "CANCELLED",
}

// Interface da transação
export interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
  createdAt: Date;
}

// Tipo para criar uma transação
export type CreateTransactionInput = {
  amount: number;
};

// Tipo para capturar ou cancelar uma transação
export type UpdateTransactionInput = {
  transactionId: string;
};
