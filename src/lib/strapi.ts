export function getStrapiURL(path = "") {
  fetch(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Network response was not ok.");
  });
}
