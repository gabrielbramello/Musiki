const header = (
    <img alt="Card" src="images/usercard.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  );
  const footer = (
    <span>
      <Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
    </span>
  );
