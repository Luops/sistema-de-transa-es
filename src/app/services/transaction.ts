// Interface
import {
  CreateTransactionInput,
  Transaction,
  TransactionStatus,
  UpdateTransactionInput,
} from "../interfaces/transactionInterface";

// Array de transações
let transactions: Transaction[] = [];

// Cria uma transação
export function createTransaction(input: CreateTransactionInput): Transaction {
  // Cria a transação
  const newTransaction: Transaction = {
    id: Math.random().toString(36).substr(7),
    amount: input.amount,
    status: TransactionStatus.PENDING,
    createdAt: new Date(),
  };

  // Adiciona a transação no array
  transactions.push(newTransaction);
  return newTransaction;
}

// Função para capturar uma transação
export function captureTransaction(
  input: UpdateTransactionInput
): Transaction | undefined {
  // Verifica se a transação existe
  const transaction = transactions.find((t) => t.id === input.transactionId);

  // Se existir e estiver pendente, captura a transação
  if (transaction && transaction.status === TransactionStatus.PENDING) {
    transaction.status = TransactionStatus.CAPTURED;
    return transaction;
  }

  return undefined;
}

// Função para cancelar uma transação
export function cancelTransaction(
  input: UpdateTransactionInput
): Transaction | undefined {
  // Verifica se a transação existe
  const transaction = transactions.find((t) => t.id === input.transactionId);

  // Se existir e estiver pendente, cancela a transação
  if (transaction && transaction.status === TransactionStatus.PENDING) {
    transaction.status = TransactionStatus.CANCELLED;
    return transaction;
  }

  return undefined;
}
