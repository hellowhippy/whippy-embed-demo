# Developer Guide for Integrating Whippy Embed Iframe

This guide is intended for developers looking to integrate the Whippy Embed Iframe into their web applications. The Whippy Embed Iframe facilitates the seamless transfer of phone number data from your application to the Whippy service for various functionalities, including SMS campaign management.

## Prerequisites

- Familiarity with HTML and JavaScript.
- Ability to modify the HTML content of your web application.

## Integration Steps

### Step 1: Embedding the Iframe

Embed the Whippy Iframe into your web page by inserting the following HTML code at the desired location:

```html
<iframe id="whippy-iframe" src="https://app.whippy.co/embed" style="width:100%; height:100%; border:none;"></iframe>
```


This snippet creates an Iframe that loads the Whippy Embed page. Adjust the `style` attribute to fit the Iframe into your page layout appropriately.

### Step 2: Preparing Phone Number Data

Organize the phone number data you intend to pass to the Iframe. The data should be structured as an array of objects, with each object containing an `id` and a `number` property, as shown below:

```jsx
const phoneNumbers = [
  { id: "1", number: "+13234249459" },
  { id: "2", number: "(555) 555-5678" },
  // Add more phone numbers as needed
];
```

### Step 3: Serializing and Passing Data to the Iframe

Depending on how you format your phone number data Whippy will either process your data as a single phone number to open a 1-1 conversation or as a list of phone numbers that you can then use to create a campaign or sequence in Whippy.

In your client code you need to ensure that your are formatting you data correct so that it can be passed to the iframe in order for the desired action to happen.

Example: Send a Single Phone Number.

```tsx
  const handleOpenConversation = (number: string) => {
    setDrawerOpen(!drawerOpen); // Toggle drawer visibility

    // Use JSON.stringify to ensure proper formatting and escaping
    const message = JSON.stringify({
      isExtension: true,
      whippy_phone: JSON.stringify(number),
    });

    // Check if the drawer is being opened
    if (!drawerOpen) {
      // Post the message with the phone numbers to the iframe's contentWindow
      drawerRef.current?.querySelector("iframe")?.contentWindow?.postMessage(
        message,
        "*" // In production, replace "*" with your specific target origin for security
      );
    }
  };
```

Example: Send a List fo Phone Numbers.

```tsx
  const handleCreateSMSCampaign = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer visibility

    // Assuming numbersFormatted is correctly structured for your needs
    const serializedPhoneNumbers = returnStringifiedArray(numbersFormatted);

    // Use JSON.stringify to ensure proper formatting and escaping
    const message = JSON.stringify({
      isExtension: true,
      whippy_phone: serializedPhoneNumbers,
    });

    // Check if the drawer is being opened
    if (!drawerOpen) {
      // Post the message with the phone numbers to the iframe's contentWindow
      drawerRef.current?.querySelector("iframe")?.contentWindow?.postMessage(
        message,
        "*" // In production, replace "*" with your specific target origin for security
      );
    }
  };
```

In order to get a more detailed example the entire set up please look at the code in `/src/app/page.tsx` for more details. 

## Conclusion

By following these steps, developers can integrate the Whippy Embed Iframe into their applications, enabling the dynamic transfer of phone number data to Whippy for enhanced functionality. This integration process is designed to be straightforward, requiring minimal adjustments to accommodate the specific needs of your application.