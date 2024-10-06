<template>
    <footer class="welcome-footer">
      <div class="footer-content">
        <p>&copy; 2024 Teck/JCR. All rights reserved.</p>
        <nav class="footer-nav">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </nav>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .welcome-footer {
    background-color: #242526;
    color: #f2f2f2;
    padding: 20px;
    text-align: center;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  /* El texto se pone encima y el menú debajo en pantallas pequeñas */
  .footer-content p {
    flex: 1 100%;
    margin-bottom: 10px;
  }
  
  .footer-nav {
    flex: 1 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .footer-nav a {
    color: #f2f2f2;
    margin: 0 10px;
    text-decoration: none;
    padding: 5px 0;
  }
  
  .footer-nav a:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 600px) {
    .footer-content {
      flex-wrap: nowrap;
    }
    
    .footer-content p {
      flex: none;
      margin-bottom: 0;
    }
  
    .footer-nav {
      flex: none;
      justify-content: flex-end;
    }
  }
  </style>
  