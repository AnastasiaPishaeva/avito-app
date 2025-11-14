export interface Product {
    id: number;
    images: string[];
    title: string;
    price: number;
    category: string;
    categoryId: number;
    createdAt: string;
    status: string;
    priority: string;
    description: string;
    updatedAt:string;
    seller: string; //пока хз
    characteristics: object;
    moderationHistory: string; //пока хз
}

export interface Info {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}
