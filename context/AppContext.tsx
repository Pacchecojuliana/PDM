import React, { createContext, useState, useContext, ReactNode } from "react";

// Definição de tipos para manter a tipagem forte e clara

// Representa um produto no cardápio
type Product = {
  id: string; // Identificador único do produto
  name: string; // Nome do produto
  price: number; // Preço do produto
  description: string; // Descrição do produto
  image: any; // Imagem do produto (pode ser um import local ou URI)
};

// Representa um pedido individual
type Order = {
  id: string; // Identificador único do pedido
  product: Product; // Produto associado ao pedido
  quantity: number; // Quantidade do produto no pedido
};

// Representa os dados do cliente
type CustomerData = {
  name: string; // Nome completo do cliente
  email: string; // Email do cliente
  phone: string; // Telefone do cliente
};

// Define o tipo completo do contexto da aplicação
type AppContextType = {
  // Dados armazenados no contexto
  products: Product[]; // Lista de produtos disponíveis
  orders: Order[]; // Lista de pedidos do cliente
  customerData: CustomerData; // Dados do cliente

  // Métodos para manipular os dados
  addProduct: (product: Product) => void; // Adicionar novo produto
  addOrder: (order: Order) => void; // Adicionar novo pedido
  updateCustomerData: (data: CustomerData) => void; // Atualizar dados do cliente
  updateOrders: (orders: Order[]) => void; // Atualizar lista completa de pedidos
};

// Cria o contexto com tipagem definida
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provedor de contexto que gerencia o estado global da aplicação
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado para produtos - inicializado com alguns produtos padrão
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Lasanha",
      price: 49.9,
      description: "Lasanha clássica com camadas de massa fresca, molho artesanal.",
      image: require("@/assets/images/lasanha.png"),
    },
    {
      id: "2",
      name: "Macarrão à bolonhesa",
      price: 60.5,
      description: "Macarrão com molho bolonhesa caseiro.",
      image: require("@/assets/images/coffeeGroup.png"),
    },
    {
      id: "3",
      name: "Macarrão Talharim",
      price: 65.9,
      description: "Macarrão Talharim com molho especial.",
      image: require("@/assets/images/macartalharin.png"),
    },
  ]);
  
  // Estado para pedidos - inicialmente vazio
  const [orders, setOrders] = useState<Order[]>([]);

  // Estado para dados do cliente - inicialmente vazio
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
  });

  // Método para adicionar um novo produto à lista
  const addProduct = (product: Product) => {
    // Adiciona o novo produto ao array existente
    setProducts((prev) => [...prev, product]);
  };

  // Método para adicionar um novo pedido
  const addOrder = (order: Order) => {
    // Adiciona o novo pedido ao array de pedidos
    setOrders((prev) => [...prev, order]);
  };

  // Método para atualizar os dados do cliente
  const updateCustomerData = (data: CustomerData) => {
    // Substitui completamente os dados do cliente
    setCustomerData(data);
  };

  // Método para atualizar a lista completa de pedidos
  const updateOrders = (newOrders: Order[]) => {
    // Substitui completamente a lista de pedidos
    setOrders(newOrders);
  };

  // Fornece o contexto para toda a aplicação
  return (
    <AppContext.Provider
      value={{
        products, // Lista de produtos
        orders, // Lista de pedidos
        customerData, // Dados do cliente
        addProduct, // Método para adicionar produto
        addOrder, // Método para adicionar pedido
        updateCustomerData, // Método para atualizar dados do cliente
        updateOrders, // Método para atualizar lista de pedidos
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar o contexto de forma mais simples
export const useAppContext = () => {
  // Obtém o contexto atual
  const context = useContext(AppContext);

  // Verifica se o contexto está disponível
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  // Retorna o contexto para uso nos componentes
  return context;
};
