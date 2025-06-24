import conf from "../conf/conf";

const base_url = `${conf.skillhub_base_api}`;

export const signup = async (data) => {
  try {
    const res = await fetch(`${base_url}/Users/getemails`);
    const existingmails = res.json();
    if (Array.isArray(existingmails) && existingmails.includes(data.Email)) {
      return { success: false, message: "Email already exists." };
    } else {
      const response = await fetch(`${base_url}/Users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return { success: false, message: "Signup failed" };
      } else {
        const result = await response.json();
        return { success: true, data: result };
      }
    }
  } catch (error) {
    console.error("Error creating account", error);
    return {
      success: false,
      message: "Something went wrong. Please contact your administrator",
    };
  }
};

export const getRoles = async () => {
  try {
    const res = await fetch(`${base_url}/Roles`);

    if (!res.ok) {
      return "No roles found";
    } else {
      return res.json();
    }
  } catch (error) {
    console.error("Error fetching roles", error);
  }
};

export const login = async (data) => {
  try {
    const response = await fetch(`${base_url}/Users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const user = await response.json();
      return { success: true, user };
    } else if (response.status === 401) {
      const msg = await response.text();
      return { success: false, msg };
    } else if (response.status === 404) {
      const msg = await response.text();
      return { success: false, msg };
    } else {
      const msg = await response.text();
      return { success: false, msg };
    }
  } catch (error) {
    console.error("Error logging user", error);
    const msg = "Network error. Please reach out to your admin";
    return { success: false, msg };
  }
};
