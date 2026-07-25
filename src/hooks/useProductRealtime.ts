import { useEffect } from "react";
import { supabase } from "../lib/supabase";

type Props = {
    table : string;
    onChanged: () => void;
};

export default function useRealtime({ 
    table,
    onChanged,
 }: Props) {

    useEffect(() => {

        const channel = supabase

            .channel("products")

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table : table,
                },
                (payload) => {

                    console.log(`[Realtime]:${table} -${payload.eventType}`);

                    onChanged();

                }
            )

            .subscribe();

        return () => {

            supabase.removeChannel(channel);

        };

    }, [table,onChanged]);

}