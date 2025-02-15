# Re-use-it! CLI

`Re-use-it! CLI` is a command-line tool that allows you to quickly and easily download reusable React components and snippets into your project. You can fetch individual components or utility snippets from the **Re-use-it** library and add them directly to your project's codebase.

Check out Re-use-it! components : [Re-use-it](https://re-use-it.vercel.app)

## Features

- Easily fetch and download React components from the [Re-use-it](https://github.com/roshith-prakash/re-use-it) repository.
- Download reusable components like buttons, modals, inputs, sliders, tooltips, etc., with a simple command.
- Automatically create necessary directories and save components in the `src/components/reuseit/` folder.
- Download utility snippets and save them in the `src/utils/` folder.
- Supports a wide range of reusable components and utility snippets.
- Simple CLI interface for fast integration.

## Installation

To use the `Re-use-it! CLI` tool in your React project, follow these steps:

### Step 1: Install Tailwind CSS and initialise Reuseit

After installing Tailwind CSS :

```bash
npx reuseit init
```

### Step 2: Add the component or snippet to your project

Navigate to your React project directory and run the following command with the name of the component or snippet you want to download:

#### To add a React component:

```bash
npx reuseit add <component-name>
```

Replace `<component-name>` with the name of the component you want to add. For example, to add the `PrimaryButton` component:

```bash
npx reuseit add primarybutton
```

This will download the component from GitHub and save it to `src/components/reuseit/PrimaryButton.tsx`.

#### To add a utility snippet:

```bash
npx reuseit add-snippet <snippet-name>
```

For example, to add the `useDebounce` snippet:

```bash
npx reuseit add-snippet usedebounce
```

This will download the utility snippet from GitHub and save it to `src/utils/useDebounce.tsx`.

Here is the list of components and snippets in camelCase:

## Available Components

Here are the components you can add to your project using the CLI:

- `accordion`
- `accordionGroup`
- `alert`
- `alertModal`
- `avatar`
- `badge`
- `card`
- `carousel`
- `checkbox`
- `combobox`
- `drawer`
- `datePicker`
- `footer`
- `input`
- `loader`
- `modal`
- `navbar`
- `otpInput`
- `passwordInput`
- `primaryButton`
- `progressBar`
- `radioButton`
- `secondaryButton`
- `select`
- `securityHeaders`
- `slider`
- `switch`
- `table`
- `textArea`
- `timeline`
- `toggle`
- `tooltip`

## Available Snippets

Here are the utility snippets you can add to your project using the CLI:

- `useDebounce`
- `axiosInstance`
- `breakUrlIntoPaths`
- `capitalizeFirstLetters`
- `cloudinary`
- `expressTemplate`
- `formatNumber`
- `getMinsToRead`
- `imageCompression`
- `multer`
- `regexFunctions`
- `shuffleArray`

## Example Usage

1. To add a **PrimaryButton** component:

   ```bash
   npx reuseit add primarybutton
   ```

2. To add a **Slider** component:

   ```bash
   npx reuseit add slider
   ```

3. To add a **Table** component:

   ```bash
   npx reuseit add table
   ```

4. To add the **useDebounce** snippet:

   ```bash
   npx reuseit add-snippet usedebounce
   ```

## Error Handling

- If you try to add a component or snippet that does not exist or is incorrectly typed, you will see an error message like:

  ```
  Error: Could not find component '<component-name>!'
  ```

- If Tailwind CSS is not installed, the CLI will show the following error:

  ```
  Tailwind CSS is not installed. Please install Tailwind CSS before adding components.
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
