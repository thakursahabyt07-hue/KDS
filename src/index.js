export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/api") {
      return Response.json({
        status: true,
        message: "API Running"
      });
    }

    const key = url.searchParams.get("key");
    const aadhaar = url.searchParams.get("aadhaar");

    if (key !== "KD") {
      return Response.json(
        {
          status: false,
          message: "Invalid API Key"
        },
        { status: 401 }
      );
    }

    if (!aadhaar) {
      return Response.json(
        {
          status: false,
          message: "aadhaar parameter missing"
        },
        { status: 400 }
      );
    }

const api =
  "https://aadhaar.asurpapa.workers.dev/api?key=Demo&aadhaar=" +
  encodeURIComponent(aadhaar);

    try {
      const res = await fetch(api);

      return new Response(res.body, {
        status: res.status,
        headers: {
          "Content-Type":
            res.headers.get("Content-Type") || "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return Response.json(
        {
          status: false,
          message: e.message
        },
        { status: 500 }
      );
    }
  }
};
