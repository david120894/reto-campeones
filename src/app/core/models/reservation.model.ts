export interface Reservation {
    id: number;
    name: string;
    country: string;
    phone: string;
    email: string;
    message: string;
    place?: string;
    type: "reservation" | "consultation";
    req_state?: string;
    institution_name?: string;
    event_name?: string;
    event_date?: string;
    created_at: string; 
}