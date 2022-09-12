/* eslint-disable camelcase */
export type Order = {
  id?: number;
  product_id: number;
  created_at?: string;
  quantity: number;
  user_id: number;
  status?: string;
};

export type OrderInvoice = {
  order_id: number;
  created_at: string;
  quantity: number;
  product_name: string;
  invoice: number;
  user_name: string;
  email: string;
  product_id: number;
  status: string;
};
