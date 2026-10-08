const URL_BASE = "http://localhost:3000";
const api = {
  async catchThoughts() {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  async saveThoughts(thought) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  async catchThoughtById(id) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  async editThoughts(thought) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos/${thought.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  async deleteThought(id) {
    try {
      const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  },
};
export default api;
