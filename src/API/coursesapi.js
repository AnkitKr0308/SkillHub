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

export const editCourse = async (courseId, formData) => {
  try {
    const response = await fetch(`${base_url}/EditCourse/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update course");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating course", error);
  }
};

export const fetchEnrolledCourses = async (userId) => {
  try {
    const response = await fetch(
      `${base_url}/EnrolledCourses?UserId=${userId}`
    );

    if (response) {
      return response.json();
    } else {
      return "Error fetching enrolled courses details";
    }
  } catch (error) {
    console.error("Error fetching enrolled courses", error);
  }
};

export const enrollCourse = async (formData) => {
  try {
    const response = await fetch(`${base_url}/EnrolledCourses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Failed to enroll course");
    }
    return result;
  } catch (error) {
    console.error("Error enrolling course", error);
  }
};

export const getCourseDetails = async (userId, courseId) => {
  try {
    const response = await fetch(
      `${base_url}/CourseDetails?userId=${userId}&courseId=${courseId}`
    );

    if (!response.ok) {
      console.error("Error fetching courses", response.message);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching course data", error);
  }
};

export const ArchiveCourse = async (courseId) => {
  try {
    const response = await fetch(`${base_url}/ArchiveCourse/${courseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Failed to archive course");
    }
    return await response.text();
  } catch (error) {
    console.error("Error archiving course", error);
  }
};
