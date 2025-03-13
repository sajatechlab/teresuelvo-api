export interface DashboardMetrics {
    debtsPerEntity: Array<{
        entityType: string;
        count: string;
    }>;
    totalAmountSaved: number;
    pendingPayments: number;
    debtsPerMonth: Array<{
        month: string;
        count: string;
    }>;
    debtsPerType: Array<{
        type: string;
        count: string;
    }>;
    totalDebtAmount: number;
    activeNegotiations: number;
    pendingPaymentsAmount: number;
}
