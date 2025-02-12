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

      // Check if Tailwind CSS is listed in dependencies or devDependencies
      const tailwindVersion = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss;
      
      if (tailwindVersion) {
        return true; // Tailwind is installed
      }
    }
  } catch (error) {
    console.error("Error reading package.json:", error.message);
  }

  return false; // Tailwind not found
}

// Function to check Tailwind CSS version
function getTailwindVersion() {
  const packageJsonPath = path.join(process.cwd(), 'node_modules', 'tailwindcss', 'package.json');

  try {
    if (fs.existsSync(packageJsonPath)) {
      const tailwindPackage = require(packageJsonPath);
      return tailwindPackage.version;
    }
  } catch (error) {
    console.error("Error reading Tailwind version:", error.message);
  }

  return null;
}

// Function to deeply merge two objects
function deepMerge(target, source) {
  // If the source is an object and the target is also an object, perform a deep merge
  if (typeof source === 'object' && source !== null && typeof target === 'object' && target !== null) {
    Object.keys(source).forEach(key => {
      if (typeof source[key] === 'object' && source[key] !== null && key in target) {
        deepMerge(target[key], source[key]); // Recursive merge
      } else {
        target[key] = source[key]; // Overwrite or add the property
      }
    });
  } else {
    target = source; // If not an object, just assign the source to the target
  }
  return target;
}

// Function to merge custom styles with existing Tailwind config
function mergeTailwindConfig(configPath, newConfig) {
  let existingConfig = {};

  try {
    if (fs.existsSync(configPath)) {
      existingConfig = require(configPath);
    }
  } catch (error) {
    console.error("Error reading Tailwind config:", error.message);
  }

  // Perform a deep merge of the existing config with new config
  const mergedConfig = deepMerge(existingConfig, newConfig);

  // Write the merged configuration back
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(mergedConfig, null, 2)}\n`);
  console.log("Tailwind configuration successfully updated!");
}

// Function to add custom styles for Tailwind v3
function addTailwindV3Styles() {
  const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');

  const customStylesV3 = {
    content: ["./src/**/*.{html,js,jsx,tsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          "darkbg": "#181818",
          "secondarydarkbg": "#1E1E1E",
          "darkmodetext": "#E4E4E4",
          "cta": "#9b0ced",
          "hovercta": "#7123b0",
          "black": "#000000",
          "white": "#ffffff",
          "heading": "#1e1e1f",
          "grey": "#f5f5f5",
          "error": "#f23f3f",
          "darkmodeCTA": "#b458ff"
        },
        fontFamily: {
          'inter': ['Inter', 'system-ui'],
          'dmSans': ['DM Sans', 'system-ui']
        },
      },
    },
    plugins: [],
  };

  mergeTailwindConfig(tailwindConfigPath, customStylesV3);
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

// Define the init command to set up custom Tailwind style 
program
  .command('init')
  .description('Initialize custom Tailwind styles for your project.')
  .action(() => {
    if (!isTailwindInstalled()) {
      console.error("Tailwind CSS is not installed. Please install Tailwind CSS before proceeding.");
      process.exit(1);
    }

    const tailwindVersion = getTailwindVersion();
    
    if (!tailwindVersion) {
      console.error("Unable to determine Tailwind version.");
      process.exit(1);
    }

    console.log(`Detected Tailwind CSS version: ${tailwindVersion}`);

    if (tailwindVersion.startsWith('3')) {
      addTailwindV3Styles();
    } else if (tailwindVersion.startsWith('4')) {
      console.log("Init command not yet supported for Tailwind v4. Please copy custom styles from : https://re-use-it.vercel.app/components/tailwind-configuration ")
    } else {
      console.log("Unsupported Tailwind version detected.");
    }
  });

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
