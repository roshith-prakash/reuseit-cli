# Re-use-it! CLI

`Re-use-it! CLI` is a command-line tool to quickly and easily download reusable React components into your project. With this CLI, you can fetch individual components from the **Re-use-it** library and add them directly to your project's codebase.

## Features

- Easily fetch and download React components from the [Re-use-it](https://github.com/roshith-prakash/re-use-it) repository.
- Automatically create necessary directories and save components to your `src/components/reuseit/` folder.
- Supports a wide range of reusable components such as buttons, modals, inputs, sliders, tooltips, etc.
- Simple CLI interface for fast integration.

## Installation

To use the `Re-use-it! CLI` tool in your React project, follow these steps:

### Step 1: Install Tailwind and set up the Custom Tailwind Classes

- [Check out the instructions here!](https://re-use-it.vercel.app/components/getting-started)

### Step 2: Add the component to your project

Navigate to your React project directory and run the following command with the name of the component you want to download:

```bash
npx reuseit add <component-name>
```

Replace `<component-name>` with the name of the component you want to add. For example, to add the `PrimaryButton` component:

```bash
npx reuseit add primarybutton
```

This will download the component from GitHub and save it to `src/components/reuseit/PrimaryButton.tsx`.

## Available Components

Here are the components you can add to your project using the CLI:

- `accordion`
- `accordiongroup`
- `alert`
- `alertmodal`
- `avatar`
- `badge`
- `card`
- `carousel`
- `checkbox`
- `combobox`
- `drawer`
- `footer`
- `input`
- `loader`
- `modal`
- `navbar`
- `otpinput`
- `passwordinput`
- `primarybutton`
- `progressbar`
- `radiobutton`
- `secondarybutton`
- `select`
- `securityheaders`
- `slider`
- `switch`
- `table`
- `textarea`
- `timeline`
- `toggle`
- `tooltip`
- `usedebounce`

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

## Error Handling

If you try to add a component that does not exist or is incorrectly typed, you will see an error message like:

```
Error: Could not find component '<component-name>!'

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
