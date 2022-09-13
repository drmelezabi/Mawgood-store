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
  product_id: number;
  status: string;
};

export type ItemInvoice = {
  order_id: number;
  created_at: string;
  quantity: number;
  product_name: string;
  invoice: number;
  product_id: number;
  status: string;
};

export type ordersList = {
  order_id: number;
  status?: string;
  items: ItemInvoice[];
}[];
