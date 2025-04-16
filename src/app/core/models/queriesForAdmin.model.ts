export interface QueriesForAdmin{
    id: number;
    name: string;
    country: string;
    phone: string;
    email: string;
    message: string;
    place?: string; 
    type: "reservation" | "consultation";
    created_at: string;
}