export interface Product {
    id: number;
    images: string[];
    title: string;
    price: number;
    category: string;
    createdAt: string;
    status: string;
    priority: string;
}

export interface Info {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}
