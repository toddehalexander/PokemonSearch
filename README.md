### 🌟 Pokémon Autocomplete with Sprite Display

This project utilizes the PokeAPI to create an autocomplete feature for Pokémon names. It allows users to type in a Pokémon's name and select from a dropdown list, which displays matching Pokémon names as the user types. When a Pokémon is selected, detailed information about that Pokémon, including its types, moves, base stats, and sprites, is fetched and displayed.

### 🚀 Features

- **Autocomplete Dropdown**: As you type in the input field, matching Pokémon names are dynamically displayed in a dropdown list.
- **Pokémon Details**: Upon selecting a Pokémon from the dropdown, detailed information about the Pokémon is fetched and displayed.
  - Displays the Pokémon's name, types, moves, and base stats.
  - Shows sprite images for front and back default, as well as front and back shiny versions.
- **Error Handling**: Provides user-friendly error messages if Pokémon data cannot be fetched.

### 🛠️ Technologies Used

- **JavaScript**: Fetches data from the PokeAPI and dynamically updates the UI.
- **HTML/CSS**: Creates the user interface elements and styles the autocomplete dropdown.
- **PokeAPI**: Retrieves Pokémon data, including names, sprites, types, moves, and stats.

### 📝 How to Use

1. **Input Field**: Start typing the name of a Pokémon into the input field.
2. **Autocomplete Dropdown**: Matching Pokémon names will appear in a dropdown list.
3. **Select Pokémon**: Click on a Pokémon name in the dropdown to view its details.
   - The Pokémon's details will be displayed, including its types, moves, and base stats.
   - Sprite images for the Pokémon (front/back default and shiny) will also be displayed.
4. **Explore Pokémon**: Learn more about different Pokémon by exploring their details using this autocomplete feature!

### 🌐 API Usage

- **PokeAPI**: Utilized to fetch a list of Pokémon names (`/pokemon`) and detailed Pokémon data (`/pokemon/{name}`).

### 🧑‍💻 Implementation Details

- **Fetching Pokémon Names**: Initial fetch request retrieves Pokémon names and populates the autocomplete feature.
- **Autocomplete Logic**: Dynamically filters Pokémon names based on user input and displays matching names in a dropdown.
- **Fetching Pokémon Details**: Retrieves detailed Pokémon data when a Pokémon is selected from the dropdown.
- **Displaying Pokémon Details**: Renders Pokémon details, including types, moves, base stats, and sprite images, on the webpage.

### 🌈 Future Enhancements

- **Search Filters**: Add additional search filters, such as by type or region.
- **Caching**: Implement caching to improve performance by storing previously fetched Pokémon data.
- **Improved UI**: Enhance the user interface with animations and transitions for a smoother experience.

### 📜 Notes

- This project is a front-end implementation and requires an internet connection to fetch Pokémon data from the PokeAPI.
- If encountering issues, ensure a stable internet connection and try again.
