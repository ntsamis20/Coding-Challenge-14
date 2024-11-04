
async function fetchUnresolvedTickets() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failure, could not retrieve tickets. Please come back later.');
      }
  
      const tickets = await response.json();
  
      if (!tickets || tickets.length === 0) {
        throw new Error('No unresolved tickets found.');
      }
  
      displayTickets(tickets);
    } catch (error) {
      displayError(error.message);
    } finally {
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  }
  
  function displayTickets(tickets) {
    const ticketContainer = document.getElementById('ticketContainer');
    ticketContainer.innerHTML = ''; 
  
    tickets.forEach(ticket => {
      const ticketElement = document.createElement('div');
      ticketElement.classList.add('ticket');
  
      ticketElement.innerHTML = `
        <p><strong>Ticket ID:</strong> ${ticket.id}</p>
        <p><strong>Customer Name:</strong> Customer ${ticket.userId}</p>
        <p><strong>Issue Description:</strong> ${ticket.title}</p>
        <p><strong>Details:</strong> ${ticket.body}</p>
      `;
  
      ticketContainer.appendChild(ticketElement);
    });
  }
  
  function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'block';
    errorMessage.textContent = `Error: ${message}`;
  }
  
  document.addEventListener('DOMContentLoaded', fetchUnresolvedTickets);
  