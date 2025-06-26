import conf from "../conf/conf";

const base_url = `${conf.skillhub_base_api}/Courses`;

export const getCourses = async () => {
  try {
    const response = await fetch(base_url);
    if (response) {
      return response.json();
    } else {
      return "No courses found";
    }
  } catch (error) {
    console.error("Error fetching courses", error);
  }
};

export const addCourse = async (formData) => {
  try {
    const response = await fetch(`${base_url}/AddCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      alert("Failed to add course");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding course", addCourse);
  }
};
