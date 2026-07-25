import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "jsr:@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

if (req.method === "OPTIONS") {
  return new Response("ok", {
    headers: corsHeaders,
  });
}


Deno.serve(async (req) => {

  const supabase = createClient(

    Deno.env.get("SUPABASE_URL")!,

    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

  );

  const { count } = await req.json();

  if (!count || count <= 0) {

    return Response.json({

      success: false,

      message: "Count must be greater than 0"

    }, { 
      status: 400,
      headers: corsHeaders,
     });

  }

  const products = [];

  for (let i = 1; i <= count; i++) {

    products.push({

      name: `Product ${Date.now()}-${i}`,

      price: Math.floor(Math.random() * 5000) + 100,

      description: `Generated Product ${i}`,

      image_url: "",

      category_id: null

    });

  }

  return Response.json({

    success: true,

    products

  });

});