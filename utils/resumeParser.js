export const fileHandler = async (file) => {
  if (!file) {
    console.log("file corrupted");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.text;

  } catch (err) {
    console.log("Parsing Error:", err);
  }
};
