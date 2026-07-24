import { type CategorySummary} from "../../services/dashboardService"
import { ResponsiveContainer, BarChart, XAxis, YAxis,
    Tooltip, Bar, CartesianGrid,LabelList,
} from "recharts"

type Props = {
    data : CategorySummary[];
}

export default function CategoryChart({data}: Props) {

    return (
        <div className="border rounded-lg p-5 mt-10">
            <h2 className="text-xl font-bold mb-5">
                📊 Products by Category
            </h2>
            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                    <XAxis dataKey="name"></XAxis>
                    <YAxis></YAxis>
                    <Bar 
                        dataKey="productCount" 
                        fill="#3B82F6" 
                        radius={[6, 6, 0, 0]}
                    >
                        <LabelList  
                            dataKey="productCount" 
                            position="top"
                        />
                    </Bar>
                    <Tooltip formatter={(value) => [`${value} Products`, "Quantity"]}>
                    </Tooltip>
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}