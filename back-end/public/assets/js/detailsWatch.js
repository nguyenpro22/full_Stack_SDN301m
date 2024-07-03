let accessToken = sessionStorage.getItem("accessToken");
function fetchWatchDetails(watchId) {
  fetch(`http://localhost:5000/v1/watch/getByIdWatches/${watchId}`)
    .then((response) => response.json())
    .then((object) => {
      console.log(object);
      const imagePath = "/" + object.image.replace("public\\", "");
      const watchDetails = document.getElementById("watchDetails");
      watchDetails.innerHTML = `
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imagePath}" alt="${object.watchName}">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${object.watchName}</p>
              <p class="subtitle-is-6">Brand: ${object.brand.brandName}</p>
            </div>
          </div>
          <div class="content">
           Price: ${object.price}$
           <div class="content">
          Description: ${object.watchDescription}
          </div>
          </div>
        </div>
        <div class="card-footer">
    <button id="feedbackButton" class="button is-info" style="display: none" onclick="openPopup()">Feedback</button>
    <button class="button is-warning" onclick="goBack()">Back</button>
    </div>  
      `;

      var memberName = sessionStorage.getItem("memberName");
      var feedbackButton = document.querySelector("#feedbackButton");
      var idMember = sessionStorage.getItem("id");
      if (memberName) {
        feedbackButton.style.display = "inline-block";
      } else {
        feedbackButton.style.display = "none";
      }
      if (object.comments.length >= 1) {
        const Comment = document.getElementById("comments");
        Comment.style.display = "inline-block";
        Comment.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Rating</th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                ${object.comments
                  .map(
                    (comment) => `
                    <tr>
                        <td>${comment.rating}⭐</td>
                        <td>${comment.content}</td>
                        <td>${comment.author.name}</td>
                        <td>${new Date(comment.createdAt).toLocaleString()}</td>
                        ${
                          comment.author._id === idMember
                            ? `<td>
                <div class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                      <span>Option</span>
                    </button>
                    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                      <div class="dropdown-content">
                            <button class="button is-warning" onClick="editFunction('${watchId}', '${comment._id}')">Edit</button>
                            <button class="button is-danger" onClick="deleteFeedback('${watchId}', '${comment._id}')">Delete</button>
                      </div>
                      </div>
                    </div>
                </div>
                </td>`
                            : ""
                        }
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
        `;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function goBack() {
  window.history.back();
}
function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function submitFeedback(watchId) {
  const rate = document.querySelector('input[name="rate"]:checked').value;
  const feedback = document.getElementById("feedback").value;
  const IdMember = sessionStorage.getItem("id");
  const data = {
    rating: rate,
    content: feedback,
    author: IdMember,
  };
  fetch(`http://localhost:5000/v1/feedback/${watchId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: "Bearer " + accessToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Feedback submitted successfully!",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Opps",
          text: "You can only comment once time",
        });
      } else if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized!",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error submitting feedback!",
      });
    });
  document.getElementById("popup").style.display = "none";
}
function deleteFeedback(watchID, commentID) {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(
        `http://localhost:5000/v1/feedback/${watchID}/comments/${commentID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: "Bearer " + accessToken,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Comment deleted successfully!",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else if (response.status === 401) {
          Swal.fire({
            icon: "error",
            title:
              "Unauthorized! You do not have permission to perform this action.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error deleting feedback!",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      });
    }
  });
}

function editFunction(watchId, commentId) {
  fetch(`http://localhost:5000/v1/feedback/${watchId}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((comment) => {
      document.getElementById("popup").style.display = "block";

      document.querySelector(
        'input[name="rate"][value="' + comment.rating + '"]'
      ).checked = true;
      document.getElementById("feedback").value = comment.content;
      document
        .querySelector("#feedbackForm button")
        .setAttribute(
          "onclick",
          `updateFeedback('${watchId}', '${commentId}')`
        );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function updateFeedback(watchId, commentId) {
  const rate = document.querySelector('input[name="rate"]:checked').value;
  const feedback = document.getElementById("feedback").value;
  const IdMember = sessionStorage.getItem("id");
  const data = {
    rating: rate,
    content: feedback,
    author: IdMember,
  };
  fetch(`http://localhost:5000/v1/feedback/${watchId}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: "Bearer " + accessToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Comment updated successfully!",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error updating comment!",
      });
      console.error("Error:", error);
    });
  document.getElementById("popup").style.display = "none";
}
