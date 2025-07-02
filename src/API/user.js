import conf from "../conf/conf";

const base_url = `${conf.skillhub_base_api}`;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${base_url}/Users`);

    if (!response.ok) {
      return { success: false, message: "Failed to fetch users" };
    }

    const users = await response.json();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users", error);
    return {
      success: false,
      message: "Something went wrong. Please contact your administrator",
    };
  }
};

export const UpdateUser = async (userId, data) => {
  try {
    const response = await fetch(`${base_url}/Users/edituser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to update user" };
    }

    const updatedUser = await response.json();
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user", error);
    return {
      success: false,
      message: "Something went wrong. Please contact your administrator",
    };
  }
};

export const DeleteUser = async (userId) => {
  try {
    const response = await fetch(`${base_url}/Users/delete/${userId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { success: false, message: "Failed to delete user" };
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user", error);
    return {
      success: false,
      message: "Something went wrong. Please contact your administrator",
    };
  }
};
