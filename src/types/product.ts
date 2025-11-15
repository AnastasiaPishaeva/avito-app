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
    moderationHistory: ModeratorHistory[]; 
}

export interface Info {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface ModeratorHistory {
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

export interface Moderator{
        id: number;
        name: string;
        email: string;
        role: string;
        statistics: ModeratorStats;
        permissions: string[];
}
    
export interface  ModeratorStats{
        totalReviewed: number;
        todayReviewed: number;
        thisWeekReviewed: number;
        thisMonthReviewed: number;
        averageReviewTime: number;
        approvalRate: number;
}

export interface StatsSummary{
        totalReviewed: number;
        totalReviewedToday: number;
        totalReviewedThisWeek: number;
        totalReviewedThisMonth: number;
        approvedPercentage: number;
        rejectedPercentage: number;
        requestChangesPercentage: number;
        averageReviewTime: number;
}

export interface Statistic{
    period: string;
    startDate : string;
    endDate: string;
}

export interface ActivityData {
  date: string; 
  approved: number;
  rejected: number;
  requestChanges: number;
}