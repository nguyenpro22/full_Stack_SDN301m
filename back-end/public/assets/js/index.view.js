document.addEventListener("DOMContentLoaded", function () {
  // Ensure the Cookies library is loaded

  // Get the jwt cookie
  const token = Cookies.get("jwt");
  console.log(token);

  axios
    .get("http://localhost:5000/api/watch/getAllWatches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      const watches = response.data;
      const watchesContainer = document.getElementById("watchesContainer");
      const userId = Cookies.get("userID");
      watches.forEach(function (watch) {
        const watchCard = `
            <div class="card bg-white p-4">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${watch.image}" alt="${watch.watchName}" class="w-full h-full object-cover rounded-lg" />
                </figure>
              </div>
              <div class="card-content mt-4">
                <div class="content">
                  <p class="title text-xl font-bold text-gray-800">
                    <strong>Name:</strong> ${watch.watchName}
                  </p>
                  <p class="subtitle text-gray-600">
                    <strong>Brand:</strong> ${watch.brand.brandName}
                  </p>
                  <p class="text-lg text-gray-800">
                    <strong>Price:</strong> $${watch.price}
                  </p>
                </div>
                <div class="mt-4">
                  <input type="button" class="button is-info px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer" value="Details" onclick="viewDetails('${watch.id}')" />
                </div>
              </div>
            </div>
          `;

        watchesContainer.insertAdjacentHTML("beforeend", watchCard);
      });
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "<strong>You need to login first</strong>",
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
            <button value="login" class="text-white" onClick=moveToLoginPage()>
                   login
                  </button>
          `,
        });
      }
    });
});

const moveToLoginPage = () => {
  window.location.href = "/login";
};

function viewDetails(watchId) {
  window.location.href = `/details?watchId=${watchId}`;
}
