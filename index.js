#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

// Initialize the CLI using Commander
const program = new Command();

// Function to check if Tailwind CSS is installed
function isTailwindInstalled() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  try {
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);

      // Check if Tailwind is in dependencies or devDependencies
      return (
        (packageJson.dependencies && packageJson.dependencies.tailwindcss) ||
        (packageJson.devDependencies && packageJson.devDependencies.tailwindcss)
      );
    }
  } catch (error) {
    console.error("Error reading package.json:", error.message);
  }

  return false;
}

// Function to download a file from GitHub and save it locally
async function downloadFile(url, destination, filename) {
  try {
    // Fetch the raw file from GitHub
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Use arrayBuffer() to get binary data
    const arrayBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to a Buffer
    const fileBuffer = Buffer.from(arrayBuffer);

    // Ensure the components directory exists
    const componentsDir = path.dirname(destination);
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }

    // Write the file to the destination path
    fs.writeFileSync(destination, fileBuffer);

    console.log(`${filename} successfully added to the project!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Define the mapping between component names and GitHub raw URLs
const componentMapping = {
  accordion: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Accordion.tsx',
  accordiongroup: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/AccordionGroup.tsx',
  alert: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Alert.tsx',
  alertmodal: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/AlertModal.tsx',
  avatar: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Avatar.tsx',
  badge: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Badge.tsx',
  card: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Card.tsx',
  carousel: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Carousel.tsx',
  checkbox: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Checkbox.tsx',
  combobox: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Combobox.tsx',
  drawer: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Drawer.tsx',
  footer: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Footer.tsx',
  input: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Input.tsx',
  loader: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Loader.tsx',
  modal: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Modal.tsx',
  navbar: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Navbar.tsx',
  otpinput: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/OTPInput.tsx',
  passwordinput: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/PasswordInput.tsx',
  primarybutton: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/PrimaryButton.tsx',
  progressbar: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/ProgressBar.tsx',
  radioButton: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/RadioButton.tsx',
  secondarybutton: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/SecondaryButton.tsx',
  select: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Select.tsx',
  securityheaders: "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/SecurityHeaders.tsx",
  slider: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Slider.tsx',
  switch: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Switch.tsx',
  table: "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Table.tsx",
  textarea: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/TextArea.tsx',
  timeline: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Timeline.tsx',
  toggle: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Toggle.tsx',
  tooltip: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/components/Tooltip.tsx',
};

// Define the mapping between snippet names and GitHub raw URLs
const snippetMapping = {
  usedebounce: 'https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/useDebounce.tsx',
  axiosinstance : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/axiosInstance.ts",
  breakurlintopaths : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/breakURLintoPaths.ts",
  capitalizefirstletters : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/capitalizeFirstLetters.ts",
  cloudinary: "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/cloudinary.ts",
  expresstemplate : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/expressTemplate.ts",
  formatnumber : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/formatNumber.ts",
  getminstoread : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/getMinsToRead.ts",
  imagecompression : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/imageCompression.ts",
  multer : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/multer.ts",
  regexfunctions:"https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/regexFunctions.ts",
  shufflearray : "https://raw.githubusercontent.com/roshith-prakash/re-use-it/refs/heads/master/src/utils/shuffleArray.ts"
}


// Define the CLI command to fetch and save the file based on the component name
program
  .command('add <component>')
  .description('Add a Re-use-it! component to your project.')
  .action(async (component) => {
    // Check if Tailwind CSS is installed
    if (!isTailwindInstalled()) {
      console.error("Tailwind CSS is not installed. Please install Tailwind CSS before adding components.");
      process.exit(1); // Exit with an error code
    }

    // Convert component name to lowercase for case-insensitivity
    const componentLowerCase = component.toLowerCase();

    // Check if the component exists in the mapping
    const url = componentMapping[componentLowerCase];

    if (!url) {
      console.error(`Could not find component '${component}'!`);
      return;
    }

    // Get the root directory of the project (not the current script directory)
    const projectRoot = process.cwd();

    // Extract the filename from the URL (the last part of the URL, e.g., 'PrimaryButton.tsx')
    const filename = path.basename(url); // e.g., 'PrimaryButton.tsx'

    // Define the destination path using the filename from the URL
    const destinationPath = path.join(projectRoot, 'src', 'components', 'reuseit', filename);

    // Download the file and save it locally
    await downloadFile(url, destinationPath, filename);

    console.log(`Please make sure to add the custom styles to your tailwind configuration!\nCheck out : https://re-use-it.vercel.app/components/tailwind-configuration `);
  });

// Define the CLI command to fetch and save the file based on the snippet name
program
  .command('add-snippet <snippet>')
  .description('Add a Re-use-it! snippet to your project.')
  .action(async (snippet) => {
    // Convert snippet name to lowercase for case-insensitivity
    const snippetLowerCase = snippet.toLowerCase();

    // Check if the snippet exists in the mapping
    const url = snippetMapping[snippetLowerCase];

    if (!url) {
      console.error(`Could not find snippet '${snippet}'!`);
      return;
    }

    // Get the root directory of the project (not the current script directory)
    const projectRoot = process.cwd();

    // Extract the filename from the URL (the last part of the URL, e.g., 'PrimaryButton.tsx')
    const filename = path.basename(url); // e.g., 'PrimaryButton.tsx'

    // Define the destination path using the filename from the URL
    const destinationPath = path.join(projectRoot, 'src', 'utils'
      , filename);

    // Download the file and save it locally
    await downloadFile(url, destinationPath, filename);
  });

// Parse the command-line arguments
program.parse(process.argv);
