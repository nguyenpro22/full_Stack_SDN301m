# Welcome to My Project

## Introduction

Welcome to the Full Stack SDN301m project. This project is divided into two parts: the back-end and the front-end. Follow the instructions below to set up and run the project on your local machine.

## Getting Started

### Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/nguyenpro22/full_Stack_SDN301m.git
```

### Back-end Setup

Navigate to the back-end directory:

```bash
cd full_Stack_SDN301m/back-end
```

Install the dependencies:

```bash
npm install
```

Create a new `.env` file in the back-end directory with the following variables:

```env
JWT_SECRET_KEY=your_jwt_secret_key
MONGODB_URL=your_mongodb_url

```

Import the data files into MongoDB.

### Front-end Setup

Navigate to the front-end directory:

```bash
cd ../front-end
```

Install the dependencies:

```bash
npm install
```

Create a new `.env` file in the front-end directory with the following variable:

```env
NEXT_PUBLIC_BASE_API_URL="http://localhost:5000/api"
```

## Running the Project

To run the back-end, use the following command:

```bash
npm start
```

To run the front-end, use the following command:

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Thank you for visiting! If you have any questions or need further assistance, feel free to open an issue.
