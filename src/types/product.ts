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
    seller: Seller; 
    characteristics: Record<string, string>;
    moderationHistory: Moderator[]; 
}

export interface Info {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface Moderator {
    id: number;
    moderatorId: number;
    moderatorName:  string;
    action: string;
    reason: string;
    comment: string;
    timestamp: string;
}

export interface Seller {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
 
}