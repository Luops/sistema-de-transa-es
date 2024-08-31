"use client";
import React, { useState } from "react";

// Services
import {
  createTransaction,
  captureTransaction,
  cancelTransaction,
} from "./services/transaction";

// Interface
import { Transaction } from "./interfaces/transactionInterface";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  console.log(transactions);

  // Preço da transação
  const [isOpenAmount, setIsOpenAmount] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(value as any)) {
      const amount = Number(value);
      setAmount(amount);
    }
  };

  // Cria uma transação
  const handleCreate = () => {
    const newTransaction = createTransaction({
      amount: amount,
    });
    setTransactions([...transactions, newTransaction]);
  };

  // Captura uma transação
  const handleCapture = (id: string) => {
    const updatedTransaction = captureTransaction({
      transactionId: id,
    });
    if (updatedTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === id ? updatedTransaction : t))
      );
    }
  };

  // Cancela uma transação
  const handleCancel = (id: string) => {
    const updatedTransaction = cancelTransaction({ transactionId: id });
    if (updatedTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === id ? updatedTransaction : t))
      );
    }
  };
  return (
    <main className="relative w-full flex min-h-screen flex-col items-center justify-between px-2 py-10 min-[460px]:p-24 bg-[#282c34] text-white">
      <h2 className="text-4xl text-center font-extrabold">
        Sistema de transação
      </h2>
      <button
        onClick={() => setIsOpenAmount(!isOpenAmount)}
        className="text-xl hover:bg-black rounded-full px-10 py-4 transition-all ease-in-out duration-300"
      >
        Criar uma transação
      </button>
      <>
        {isOpenAmount && (
          <div className="fixed inset-0 w-[90%] bg-slate-400 p-5 rounded-md drop-shadow-lg min-[460px]:w-[400px] min-[1200px]:w-[600px]: h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
            <input
              type="number"
              placeholder="Valor da transação"
              className="w-full bg-white p-5 text-2xl text-black"
              onChange={handleAmount}
            />
            <button
              onClick={() => {
                handleCreate();
                setIsOpenAmount(false);
              }}
              className="w-full bg-blue-700 hover:bg-blue-950 transition-all ease-in-out duration-300 py-4 rounded"
            >
              Criar
            </button>
            <button
              onClick={() => setIsOpenAmount(false)}
              className="w-full bg-black hover:bg-red-700 transition-all ease-in-out duration-300 py-4 rounded"
            >
              Fechar
            </button>
          </div>
        )}
      </>
      <ul
        className={`flex flex-col gap-10 w-full min-[460px]:w-[400px] min-[1200px]:w-[500px] max-h-[50vh] overflow-auto`}
      >
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex flex-col border-l-4 pl-2 ${
              transaction.status === "CANCELLED"
                ? "border-red-500"
                : transaction.status === "CAPTURED"
                ? "border-green-500"
                : "border-white"
            }`}
          >
            <p>Identificação: {transaction.id}</p>
            <p>Valor: R$ {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
            <p>
              Data de criação:{" "}
              {new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <button
              onClick={() => handleCapture(transaction.id)}
              className="mt-5 text-green-500 hover:text-green-600 transition-all ease-in-out duration-300"
            >
              Capturar transação
            </button>
            <button
              onClick={() => handleCancel(transaction.id)}
              className="mt-5 text-red-500 hover:text-red-600 transition-all ease-in-out duration-300"
            >
              Cancelar transação
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
