import { Shield, Monitor, Wifi, Smartphone, Cloud, Search } from "lucide-react"

export interface ArticleContent {
  sections: Array<{
    title: string
    content?: string
    list?: Array<{
      name: string
      url?: string
      note?: string
    }>
    additionalInfo?: string
    subsections?: Array<{
      title: string
      content?: string
      points?: string[]
    }>
    points?: string[]
    tools?: Array<{
      name: string
      description: string
    }>
  }>
}

export interface Article {
  slug: string
  title: string
  category: string
  description: string
  readTime: string
  icon: React.ReactNode
  tags: string[]
  content: ArticleContent
}

export const articlesData: Article[] = [
  {
    slug: "online-safety-security-guide",
    title: "Online Safety & Security Guide",
    category: "Security",
    description:
      "Comprehensive guide covering anti-virus software, secure browsing, safe downloads, and privacy protection.",
    readTime: "12 min read",
    icon: <Shield className="h-5 w-5" />,
    tags: ["Security", "All Levels"],
    content: {
      sections: [
        {
          title: "Anti-virus Software",
          content: `Use known, trusted anti-Virus Software and download it directly from the site. This ensures that you are not obtaining malicious material from an untrusted third party. Some reputable anti-Virus software includes:`,
          list: [
            { name: "Malware Bytes", url: "https://www.malwarebytes.com/", note: "includes free options!" },
            { name: "Avast", url: "https://www.avast.com/", note: "includes free options!" },
            { name: "MacAfee", url: "https://www.mcafee.com/" },
            { name: "Norton", url: "https://norton.com" },
          ],
          additionalInfo: `Modern antivirus keeps itself automatically updated so it can protect against the latest threats. Never trust a pop-up that asks you to renew your anti-virus or pay to remove a virus, your trusted software will never ask you to do this. Run regular scans to catch harmful files or programs.`
        },
        {
          title: "Secure Sites and Safe Browsing",
          subsections: [
            {
              title: "Secure Websites",
              points: [
                "Look for HTTPS at the beginning of a website's address.",
                "A lock icon in the address bar indicates the site encrypts your data.",
                "Avoid entering personal or financial information on sites without HTTPS."
              ]
            },
            {
              title: "Site Certifications",
              content: "Trusted websites often display security certifications or trust seals. Be cautious: fake sites may copy logos—always check the web address carefully. When in doubt, search for reviews or verify the organization independently."
            }
          ]
        },
        {
          title: "Before You Download",
          points: [
            "Only download files or software from trusted, well-known sources (see Secure Sites and Safe Browsing above.)",
            "Be cautious of pop-ups or \"free\" offers that seem too good to be true. Some of these claim to be honest sites or anti-virus software, but are actually malware.",
            "Scan downloads with anti-virus software before opening them - very important!",
            "Windows: right-click a downloaded file or folder in File Explorer and select \"Scan with Microsoft Defender.\"",
            "Apple will scan and warn you automatically"
          ]
        },
        {
          title: "Privacy and Security Options",
          content: "Options to protect your privacy while browsing (including VPN's, incognito mode, clearing cache, and refraining from sharing personal information within certain contexts)",
          tools: [
            {
              name: "VPNs",
              description: "Protect your connection on public Wi-Fi"
            },
            {
              name: "Incognito/Private Browsing",
              description: "Limit stored browsing history within your own device"
            },
            {
              name: "Clearing Cache and Cookies",
              description: "Reduce stored tracking data"
            }
          ],
          additionalInfo: "Avoid sharing personal information unless it's necessary and secure. Be mindful of what you post or submit online—once shared, it may be hard to remove."
        }
      ]
    }
  },
  {
    slug: "computer-maintenance-tips",
    title: "Essential Computer Maintenance Tips",
    category: "Maintenance",
    description:
      "Learn how to keep your computer running smoothly with regular maintenance tasks and best practices.",
    readTime: "5 min read",
    icon: <Monitor className="h-5 w-5" />,
    tags: ["Beginner", "Maintenance"],
    content: {
      sections: [
        {
          title: "Regular Software Updates",
          content: "Keeping your software up to date is one of the most important maintenance tasks you can perform. Updates often include security patches, bug fixes, and performance improvements.",
          points: [
            "Enable automatic updates for your operating system (Windows Update or macOS Software Update)",
            "Keep your applications updated through their built-in update mechanisms or app stores",
            "Update your web browsers regularly for security and performance",
            "Don't ignore update notifications - install them as soon as convenient"
          ],
          additionalInfo: "Security updates are particularly critical as they protect against newly discovered vulnerabilities that hackers actively exploit."
        },
        {
          title: "Disk Cleanup and Storage Management",
          content: "Over time, your computer accumulates temporary files, cached data, and other clutter that can slow down performance and waste storage space.",
          subsections: [
            {
              title: "Windows Users",
              points: [
                "Use the built-in Disk Cleanup tool (search for it in the Start menu)",
                "Empty the Recycle Bin regularly",
                "Uninstall programs you no longer use via Settings > Apps",
                "Use Storage Sense to automatically free up space"
              ]
            },
            {
              title: "Mac Users",
              points: [
                "Empty the Trash regularly",
                "Use the 'Manage' button in About This Mac > Storage",
                "Remove old iOS backups and system files you don't need",
                "Uninstall unused applications by dragging them to Trash"
              ]
            }
          ],
          additionalInfo: "Aim to keep at least 15-20% of your hard drive free for optimal performance."
        },
        {
          title: "Physical Cleaning",
          content: "Dust and debris can cause overheating and hardware failures. Regular physical cleaning extends your computer's lifespan.",
          points: [
            "Shut down and unplug your computer before cleaning",
            "Use compressed air to blow dust out of vents and fans (hold can upright)",
            "Wipe down the screen with a microfiber cloth slightly dampened with water or screen cleaner",
            "Clean the keyboard with compressed air and wipe keys with isopropyl alcohol on a cloth",
            "For laptops, clean vents every 3-6 months; for desktops, open the case annually and clean inside"
          ],
          additionalInfo: "Never spray liquid directly onto any computer component. Always apply cleaning solution to a cloth first."
        },
        {
          title: "Backup Your Data",
          content: "Regular backups protect you from data loss due to hardware failure, malware, or accidental deletion.",
          tools: [
            {
              name: "Windows Backup",
              description: "Use File History or Backup and Restore (Windows 7) built into Windows"
            },
            {
              name: "macOS Time Machine",
              description: "Built-in backup solution that automatically backs up your entire Mac"
            },
            {
              name: "Cloud Backup",
              description: "Services like OneDrive, Google Drive, or Dropbox for automatic cloud backups"
            },
            {
              name: "External Hard Drive",
              description: "Manual backups to an external drive for full control and offline storage"
            }
          ],
          additionalInfo: "Follow the 3-2-1 rule: Keep 3 copies of your data, on 2 different types of media, with 1 copy stored offsite."
        },
        {
          title: "Performance Optimization",
          content: "Simple maintenance tasks can significantly improve your computer's speed and responsiveness.",
          points: [
            "Limit startup programs to only essential applications",
            "Close unused programs and browser tabs to free up RAM",
            "Restart your computer at least once a week to clear memory",
            "Run disk defragmentation on Windows hard drives (not SSDs) monthly",
            "Check for malware regularly with your antivirus software",
            "Keep your desktop clean - files stored on the desktop can slow down startup"
          ]
        }
      ]
    }
  },
  {
    slug: "cybersecurity-basics",
    title: "Understanding Cybersecurity Basics",
    category: "Security",
    description:
      "A comprehensive guide to protecting yourself online, including password management and identifying threats.",
    readTime: "8 min read",
    icon: <Shield className="h-5 w-5" />,
    tags: ["Security", "All Levels"],
    content: {
      sections: [
        {
          title: "Strong Password Practices",
          content: "Passwords are your first line of defense against unauthorized access. Creating and managing strong passwords is essential for online security.",
          subsections: [
            {
              title: "Creating Strong Passwords",
              points: [
                "Use at least 12-16 characters (longer is better)",
                "Include uppercase and lowercase letters, numbers, and symbols",
                "Avoid dictionary words, personal information, or common patterns",
                "Create unique passwords for each account - never reuse passwords",
                "Consider using passphrases: random words strung together (e.g., 'Coffee-Turtle-Piano-Mountain-42')"
              ]
            },
            {
              title: "Password Managers",
              content: "Password managers securely store all your passwords and can generate strong, unique passwords for each account. Popular options include:",
              list: [
                { name: "Bitwarden", url: "https://bitwarden.com/", note: "free and open-source" },
                { name: "1Password", url: "https://1password.com/" },
                { name: "LastPass", url: "https://www.lastpass.com/", note: "free tier available" },
                { name: "Dashlane", url: "https://www.dashlane.com/" }
              ]
            }
          ],
          additionalInfo: "Never write passwords on sticky notes or save them in plain text files. Use a reputable password manager instead."
        },
        {
          title: "Two-Factor Authentication (2FA)",
          content: "Two-factor authentication adds an extra layer of security by requiring a second form of verification beyond your password.",
          points: [
            "Enable 2FA on all accounts that support it, especially email, banking, and social media",
            "Use authenticator apps (Google Authenticator, Microsoft Authenticator, Authy) instead of SMS when possible",
            "Save backup codes in a secure location in case you lose access to your 2FA device",
            "SMS-based 2FA is better than nothing, but app-based or hardware keys are more secure"
          ],
          additionalInfo: "Even if someone steals your password, they won't be able to access your account without the second factor."
        },
        {
          title: "Recognizing Phishing Attempts",
          content: "Phishing is when attackers try to trick you into revealing sensitive information by pretending to be a trustworthy entity.",
          subsections: [
            {
              title: "Red Flags to Watch For",
              points: [
                "Urgent or threatening language ('Your account will be closed!')",
                "Requests for personal information, passwords, or financial details",
                "Suspicious sender email addresses that don't match the company's official domain",
                "Poor grammar, spelling mistakes, or unprofessional formatting",
                "Links that don't match the stated destination (hover over links to see the actual URL)",
                "Unexpected attachments, especially .exe, .zip, or .scr files"
              ]
            },
            {
              title: "What to Do",
              points: [
                "Never click links or download attachments from suspicious emails",
                "Go directly to the company's website by typing the URL yourself",
                "Contact the company through official channels to verify the request",
                "Report phishing emails to your email provider and the impersonated company",
                "Delete the phishing email after reporting it"
              ]
            }
          ]
        },
        {
          title: "Safe Social Media Practices",
          content: "Social media platforms are common targets for cybercriminals. Protect yourself with these practices.",
          points: [
            "Review and adjust your privacy settings to limit who can see your posts",
            "Be cautious about sharing personal information (address, phone number, birth date)",
            "Don't accept friend requests from people you don't know",
            "Be skeptical of messages asking for money, even if they appear to be from friends",
            "Avoid clicking on suspicious links, even from friends whose accounts may be compromised",
            "Think before you post - information shared online can be permanent"
          ]
        },
        {
          title: "Public Wi-Fi Security",
          content: "Public Wi-Fi networks are convenient but pose security risks as they're often unsecured.",
          points: [
            "Avoid accessing sensitive accounts (banking, email) on public Wi-Fi",
            "Use a VPN (Virtual Private Network) to encrypt your connection on public networks",
            "Disable automatic Wi-Fi connections on your devices",
            "Turn off file sharing and ensure your firewall is enabled",
            "Forget the network after disconnecting so your device doesn't auto-connect later",
            "Verify the network name with staff - attackers sometimes create fake hotspots with similar names"
          ],
          additionalInfo: "If you must access sensitive information on public Wi-Fi, always use a VPN to encrypt your traffic."
        },
        {
          title: "Regular Security Checkups",
          content: "Make cybersecurity an ongoing practice, not a one-time task.",
          tools: [
            {
              name: "Review Account Activity",
              description: "Check login history and active sessions on important accounts monthly"
            },
            {
              name: "Update Software",
              description: "Keep operating systems, browsers, and applications updated with security patches"
            },
            {
              name: "Audit Permissions",
              description: "Review which apps have access to your data and revoke unnecessary permissions"
            },
            {
              name: "Change Passwords",
              description: "Update passwords if you suspect a breach or if you've been reusing passwords"
            }
          ]
        }
      ]
    }
  },
  {
    slug: "home-network-setup",
    title: "Setting Up Your Home Network",
    category: "Networking",
    description: "Step-by-step instructions for setting up a secure and reliable home Wi-Fi network.",
    readTime: "6 min read",
    icon: <Wifi className="h-5 w-5" />,
    tags: ["Intermediate", "Networking"],
    content: {
      sections: [
        {
          title: "Choosing the Right Router Location",
          content: "Router placement significantly affects your Wi-Fi signal strength and coverage.",
          points: [
            "Place your router in a central location in your home for even coverage",
            "Position it elevated (on a shelf or mounted on a wall), not on the floor",
            "Keep it away from walls, metal objects, and electronic devices that cause interference",
            "Avoid placing near microwave ovens, cordless phones, or baby monitors",
            "Keep router vents clear for proper ventilation to prevent overheating"
          ],
          additionalInfo: "If you have a multi-story home, place the router on the middle floor for better vertical coverage."
        },
        {
          title: "Initial Router Setup",
          content: "Properly configuring your router ensures better security and performance.",
          subsections: [
            {
              title: "Physical Connection",
              points: [
                "Connect the modem to your router's WAN/Internet port using an Ethernet cable",
                "Plug in the router's power adapter and turn it on",
                "Wait 2-3 minutes for the router to fully boot up",
                "Connect a computer to the router via Ethernet cable or Wi-Fi for initial setup"
              ]
            },
            {
              title: "Accessing Router Settings",
              points: [
                "Open a web browser and type the router's IP address (usually 192.168.1.1 or 192.168.0.1)",
                "Check the router's label or manual for the default IP address",
                "Log in with the default username and password (found on the router or in the manual)",
                "You'll be prompted to change the default admin password - choose a strong one"
              ]
            }
          ]
        },
        {
          title: "Securing Your Wi-Fi Network",
          content: "Security should be your top priority when setting up your network.",
          points: [
            "Change the default network name (SSID) to something unique but not personally identifiable",
            "Set a strong Wi-Fi password (WPA3 or WPA2 encryption) - at least 12 characters",
            "Disable WPS (Wi-Fi Protected Setup) as it has known security vulnerabilities",
            "Change the default router admin password to prevent unauthorized access",
            "Disable remote management unless you specifically need it",
            "Enable the router's firewall if not already enabled by default",
            "Consider hiding your SSID for added security (though this can make connecting new devices harder)"
          ],
          additionalInfo: "Never use WEP encryption - it's outdated and easily cracked. Always use WPA2 or WPA3."
        },
        {
          title: "Optimizing Network Performance",
          content: "Fine-tune your network settings for better speed and reliability.",
          subsections: [
            {
              title: "Channel Selection",
              points: [
                "Use a Wi-Fi analyzer app to identify the least congested channel",
                "For 2.4GHz networks, channels 1, 6, and 11 are recommended (they don't overlap)",
                "For 5GHz networks, most channels are acceptable as there's less interference",
                "Enable Auto channel selection if your router supports it"
              ]
            },
            {
              title: "Dual-Band Configuration",
              content: "If you have a dual-band router (2.4GHz and 5GHz), optimize both bands:",
              points: [
                "Use 2.4GHz for devices far from the router or that need better wall penetration",
                "Use 5GHz for devices close to the router that need higher speeds (streaming, gaming)",
                "Give each band a different name (SSID) so you can choose which to connect to",
                "Enable band steering if available to automatically connect devices to the best band"
              ]
            }
          ]
        },
        {
          title: "Guest Network Setup",
          content: "A guest network provides internet access to visitors while keeping your main network secure.",
          points: [
            "Enable the guest network feature in your router settings",
            "Use a different password than your main network",
            "Enable network isolation to prevent guests from accessing your devices",
            "Set a bandwidth limit for the guest network if available",
            "Disable guest network access when not needed"
          ],
          additionalInfo: "Guest networks are also useful for IoT devices (smart home gadgets) to isolate them from your main network."
        },
        {
          title: "Ongoing Maintenance",
          content: "Keep your network running smoothly with regular maintenance.",
          points: [
            "Update your router's firmware regularly (check monthly for updates)",
            "Restart your router every few months to clear memory and refresh connections",
            "Review connected devices periodically and remove any you don't recognize",
            "Change your Wi-Fi password annually or if you suspect it's been compromised",
            "Monitor your network speed and contact your ISP if it's consistently slower than expected"
          ],
          tools: [
            {
              name: "Speed Test",
              description: "Use speedtest.net or fast.com to check your internet speed regularly"
            },
            {
              name: "Router App",
              description: "Many modern routers have mobile apps for easy management and monitoring"
            }
          ]
        }
      ]
    }
  },
  {
    slug: "smartphone-security",
    title: "Smartphone Security Guide",
    category: "Security",
    description: "Protect your mobile device with these essential security tips and privacy settings.",
    readTime: "4 min read",
    icon: <Smartphone className="h-5 w-5" />,
    tags: ["Beginner", "Security"],
    content: {
      sections: [
        {
          title: "Lock Screen Security",
          content: "Your lock screen is your phone's first line of defense against unauthorized access.",
          subsections: [
            {
              title: "Screen Lock Options",
              points: [
                "Use biometric authentication (fingerprint or Face ID) when available",
                "Set a PIN of at least 6 digits or a strong password as backup",
                "Avoid simple patterns or common PINs (1234, 0000)",
                "Set your phone to lock automatically after 30 seconds to 1 minute of inactivity",
                "Disable lock screen notifications that show sensitive content"
              ]
            },
            {
              title: "Lock Screen Settings",
              content: "Configure what appears on your lock screen to balance convenience and privacy.",
              points: [
                "Hide sensitive notification content until unlocked",
                "Disable Siri/Google Assistant access from the lock screen to prevent bypasses",
                "Turn off Control Center access on the lock screen (iOS)",
                "Enable 'Find My Device' (iOS) or 'Find My Device' (Android) in case of loss or theft"
              ]
            }
          ]
        },
        {
          title: "App Security and Permissions",
          content: "Apps can access various phone features and data. Control what they can access.",
          points: [
            "Only download apps from official stores (App Store for iOS, Google Play for Android)",
            "Review app permissions before installing and deny unnecessary access",
            "Periodically audit app permissions in Settings and revoke what's not needed",
            "Be cautious of apps requesting excessive permissions unrelated to their function",
            "Update apps regularly to get security patches",
            "Delete apps you no longer use"
          ],
          additionalInfo: "Common permissions to watch: location, camera, microphone, contacts, and photos. Only grant these when necessary."
        },
        {
          title: "Operating System Updates",
          content: "Keeping your phone's OS updated is crucial for security and performance.",
          points: [
            "Enable automatic updates or check manually at least monthly",
            "Install security updates as soon as they're available",
            "Back up your phone before major OS updates",
            "Keep your phone on a supported OS version that receives security updates",
            "If your phone is too old for updates, consider upgrading for security reasons"
          ],
          additionalInfo: "Most phones receive security updates for 3-5 years. Phones running outdated OS versions are vulnerable to known exploits."
        },
        {
          title: "Public Wi-Fi and Bluetooth Safety",
          content: "Wireless connections can expose your phone to security risks if not managed properly.",
          subsections: [
            {
              title: "Wi-Fi Safety",
              points: [
                "Avoid accessing sensitive information on public Wi-Fi",
                "Use a mobile VPN when connected to public networks",
                "Turn off Wi-Fi auto-connect to prevent connecting to malicious networks",
                "Forget public networks after use",
                "Disable Wi-Fi when not needed to prevent tracking"
              ]
            },
            {
              title: "Bluetooth Security",
              points: [
                "Turn off Bluetooth when not in use",
                "Don't accept pairing requests from unknown devices",
                "Set your device to 'non-discoverable' when possible",
                "Forget old Bluetooth connections you no longer use"
              ]
            }
          ]
        },
        {
          title: "Data Backup and Encryption",
          content: "Protect your data with regular backups and encryption.",
          tools: [
            {
              name: "iCloud Backup (iOS)",
              description: "Automatic encrypted backups to Apple's cloud service"
            },
            {
              name: "Google One Backup (Android)",
              description: "Automatic backups of apps, photos, and settings to Google cloud"
            },
            {
              name: "Device Encryption",
              description: "Enabled by default on modern phones - encrypts all data with your passcode"
            },
            {
              name: "Two-Factor Authentication",
              description: "Enable 2FA on your Apple ID or Google Account for additional security"
            }
          ],
          additionalInfo: "Regular backups ensure you don't lose data if your phone is lost, stolen, or damaged."
        },
        {
          title: "Physical Security",
          content: "Protecting your physical device is just as important as digital security.",
          points: [
            "Never leave your phone unattended in public places",
            "Use a screen protector and case to prevent damage",
            "Enable 'Find My iPhone' (iOS) or 'Find My Device' (Android) to locate or remotely wipe if stolen",
            "Write down your phone's IMEI number (dial *#06#) in case you need to report it stolen",
            "Be aware of shoulder surfing when entering passwords in public",
            "Don't plug your phone into unknown USB ports - they could install malware"
          ],
          additionalInfo: "If your phone is lost or stolen, immediately use Find My Device to lock it remotely and display a message with contact information."
        }
      ]
    }
  },
  {
    slug: "cloud-storage-best-practices",
    title: "Cloud Storage Best Practices",
    category: "Cloud Services",
    description: "Maximize your cloud storage efficiency and security with these professional tips.",
    readTime: "7 min read",
    icon: <Cloud className="h-5 w-5" />,
    tags: ["Intermediate", "Cloud"],
    content: {
      sections: [
        {
          title: "Choosing the Right Cloud Storage Service",
          content: "Select a cloud storage provider that fits your needs for storage, security, and budget.",
          list: [
            { name: "Google Drive", note: "15 GB free, excellent integration with Google Workspace" },
            { name: "Microsoft OneDrive", note: "5 GB free, best for Microsoft 365 users" },
            { name: "Dropbox", note: "2 GB free, excellent file sync and sharing features" },
            { name: "iCloud", note: "5 GB free, seamless integration for Apple device users" },
            { name: "Box", note: "10 GB free, good for business collaboration" }
          ],
          additionalInfo: "Consider factors like free storage amount, platform compatibility, collaboration features, and integration with apps you already use."
        },
        {
          title: "Organizing Your Cloud Files",
          content: "A well-organized cloud storage system makes files easy to find and manage.",
          points: [
            "Create a clear folder hierarchy (e.g., Work, Personal, Photos, Documents)",
            "Use consistent naming conventions for files and folders",
            "Add dates to file names when relevant (YYYY-MM-DD format sorts chronologically)",
            "Create a 'To Sort' folder for new files, then organize them weekly",
            "Use folders instead of dumping everything in the root directory",
            "Take advantage of tags or labels if your service supports them",
            "Keep folder names short and descriptive"
          ],
          additionalInfo: "Good organization now saves hours of searching later. Spend 10 minutes weekly organizing new files."
        },
        {
          title: "Security and Privacy",
          content: "Protect your cloud-stored data with strong security practices.",
          subsections: [
            {
              title: "Account Security",
              points: [
                "Use a strong, unique password for your cloud storage account",
                "Enable two-factor authentication (2FA) on your account",
                "Review account activity regularly for suspicious logins",
                "Don't share your account credentials with others",
                "Log out of shared or public computers after accessing your cloud storage"
              ]
            },
            {
              title: "File Security",
              points: [
                "Encrypt sensitive files before uploading (use tools like VeraCrypt or 7-Zip with password protection)",
                "Be cautious when sharing files - use password protection and expiration dates on shared links",
                "Review and revoke old sharing permissions periodically",
                "Avoid storing extremely sensitive data (passwords, financial records, SSN) without encryption",
                "Use private/individual sharing instead of public links when possible"
              ]
            }
          ],
          additionalInfo: "Most cloud services encrypt data in transit and at rest, but they can still access your files. Encrypt sensitive data yourself for maximum privacy."
        },
        {
          title: "Efficient File Syncing",
          content: "Optimize how files sync between your devices and the cloud.",
          points: [
            "Use selective sync to only sync folders you need on each device",
            "Pause syncing when on metered connections to avoid data charges",
            "Don't sync large files to devices with limited storage",
            "Close files before editing to prevent sync conflicts",
            "If a sync conflict occurs, review both versions before deleting",
            "Use the desktop app for large file uploads instead of the web interface",
            "Ensure you have a stable internet connection before uploading important files"
          ],
          additionalInfo: "Selective sync saves local storage by keeping files in the cloud until you need them."
        },
        {
          title: "Collaboration Features",
          content: "Make the most of cloud storage for working with others.",
          tools: [
            {
              name: "Real-time Collaboration",
              description: "Edit documents simultaneously with others in Google Docs, Office 365, or similar"
            },
            {
              name: "Comments and Suggestions",
              description: "Use commenting features to discuss changes without editing the original"
            },
            {
              name: "Version History",
              description: "Access previous versions of files if you need to undo changes"
            },
            {
              name: "Shared Folders",
              description: "Create shared folders for team projects with appropriate permissions"
            }
          ],
          points: [
            "Set appropriate permissions (view, comment, edit) for each collaborator",
            "Use 'Suggest' mode in Google Docs for proposed changes that need approval",
            "Check version history to see who made what changes and when",
            "Remove access when collaborators no longer need it",
            "Use team folders for ongoing projects, links for one-time shares"
          ]
        },
        {
          title: "Storage Management",
          content: "Keep your cloud storage under control and avoid running out of space.",
          points: [
            "Regularly review and delete old files you no longer need",
            "Empty the trash/recycle bin - deleted files still count against your quota until permanently removed",
            "Compress large files or folders before uploading",
            "Use cloud storage for active files; archive old files locally or on external drives",
            "Check which files are taking up the most space using storage management tools",
            "Consider upgrading to a paid plan if you consistently need more space",
            "Avoid storing duplicate files - use search to check if a file already exists"
          ],
          additionalInfo: "Many services offer storage analysis tools that show which files and folders consume the most space."
        },
        {
          title: "Backup Strategy",
          content: "Cloud storage is part of a backup strategy, not the only solution.",
          points: [
            "Follow the 3-2-1 rule: 3 copies of data, 2 different media types, 1 offsite",
            "Use cloud storage as your offsite backup",
            "Keep a local backup on an external hard drive",
            "Set up automatic backups for important folders",
            "Test your backups periodically to ensure you can restore files",
            "Don't rely solely on cloud storage - have a local copy of critical files"
          ],
          additionalInfo: "Cloud storage services can have outages or account issues. Always maintain a local backup of irreplaceable files."
        }
      ]
    }
  },
  {
    slug: "troubleshooting-pc-issues",
    title: "Troubleshooting Common PC Issues",
    category: "Troubleshooting",
    description: "Quick solutions for the most common computer problems you might encounter.",
    readTime: "10 min read",
    icon: <Search className="h-5 w-5" />,
    tags: ["All Levels", "Troubleshooting"],
    content: {
      sections: [
        {
          title: "Computer Won't Turn On",
          content: "When your computer doesn't respond to the power button, try these steps in order.",
          subsections: [
            {
              title: "Desktop Computers",
              points: [
                "Check that the power cable is firmly connected to both the computer and wall outlet",
                "Verify the wall outlet works by plugging in another device",
                "Check if the power supply switch on the back is in the ON position",
                "Look for LED lights on the motherboard - if lit, power is reaching the system",
                "Try a different power cable if available",
                "Hold the power button for 30 seconds, then try starting normally"
              ]
            },
            {
              title: "Laptops",
              points: [
                "Plug in the charger and look for LED indicators showing charging",
                "Try a different outlet to rule out power issues",
                "Remove the battery (if removable), hold power button 30 seconds, reinsert battery and try again",
                "Check the charging cable for damage or fraying",
                "Let the laptop charge for 30 minutes before attempting to power on"
              ]
            }
          ],
          additionalInfo: "If none of these work, you may have a hardware failure requiring professional repair."
        },
        {
          title: "Slow Performance",
          content: "A slow computer is frustrating but often fixable with these solutions.",
          points: [
            "Restart your computer - this clears memory and can resolve many slowness issues",
            "Check Task Manager (Ctrl+Shift+Esc on Windows) or Activity Monitor (Mac) to identify resource-hungry programs",
            "Close unnecessary programs and browser tabs",
            "Disable startup programs that launch when you boot up",
            "Run a full antivirus scan to check for malware",
            "Clear browser cache and cookies",
            "Ensure you have at least 15% free disk space",
            "Add more RAM if you frequently max out available memory",
            "Consider upgrading from HDD to SSD for dramatic speed improvements"
          ],
          additionalInfo: "Programs running in the background are often the culprit. Check your system tray for unnecessary programs."
        },
        {
          title: "Blue Screen of Death (Windows) or Kernel Panic (Mac)",
          content: "These critical errors cause your computer to crash and restart.",
          subsections: [
            {
              title: "Immediate Steps",
              points: [
                "Note the error code or message displayed on the blue/black screen",
                "Let the computer restart automatically",
                "If it crashes repeatedly, boot into Safe Mode",
                "Check if recent software installations or updates preceded the crash"
              ]
            },
            {
              title: "Common Solutions",
              points: [
                "Update or roll back recently installed drivers",
                "Uninstall recently added software",
                "Run Windows Memory Diagnostic to check for RAM issues",
                "Check for overheating - clean dust from vents and fans",
                "Run System File Checker (sfc /scannow in Command Prompt as admin)",
                "Update your BIOS/UEFI firmware if crashes persist",
                "Test hardware components individually if problems continue"
              ]
            }
          ],
          additionalInfo: "Search the specific error code online for targeted solutions. Common causes include driver conflicts, hardware failures, or corrupted system files."
        },
        {
          title: "No Internet Connection",
          content: "When you can't get online, methodically troubleshoot the issue.",
          points: [
            "Check if other devices can connect - this determines if it's your device or network",
            "Restart your router and modem: unplug for 30 seconds, plug modem first, wait 2 minutes, then plug in router",
            "Forget and reconnect to the Wi-Fi network on your device",
            "Try connecting with an Ethernet cable to rule out Wi-Fi issues",
            "Run the built-in network troubleshooter (Windows: Settings > Network > Status > Network troubleshooter)",
            "Update your network adapter drivers",
            "Disable VPN or proxy if you're using one",
            "Check with your ISP for service outages in your area",
            "Reset network settings as a last resort (this removes all saved networks)"
          ],
          additionalInfo: "If only your device has issues, the problem is likely with your computer's network adapter or settings. If no devices connect, it's your router or ISP."
        },
        {
          title: "Programs Freezing or Crashing",
          content: "When specific programs become unresponsive or close unexpectedly.",
          points: [
            "Force quit the frozen program (Ctrl+Alt+Del on Windows, Cmd+Option+Esc on Mac)",
            "Restart your computer before relaunching the program",
            "Update the program to the latest version",
            "Check if your computer meets the program's system requirements",
            "Run the program as administrator (Windows)",
            "Clear the program's cache or reset preferences (location varies by program)",
            "Uninstall and reinstall the program",
            "Check if antivirus software is blocking the program",
            "Look for error logs in Event Viewer (Windows) to identify the cause"
          ],
          additionalInfo: "Incompatible plugins, corrupted preferences, or insufficient system resources commonly cause program crashes."
        },
        {
          title: "Strange Noises from Computer",
          content: "Unusual sounds can indicate hardware issues that need attention.",
          subsections: [
            {
              title: "Clicking or Grinding",
              content: "Often indicates a failing hard drive. Back up your data immediately and consider replacing the drive.",
              points: [
                "Run hard drive diagnostic tools (CrystalDiskInfo for Windows, Disk Utility for Mac)",
                "Back up all important data as soon as possible",
                "Consider replacing the hard drive if diagnostics show errors",
                "Do not ignore this sound - hard drive failure can result in permanent data loss"
              ]
            },
            {
              title: "Loud Fan Noise",
              content: "Usually means the computer is overheating or fans are working harder than normal.",
              points: [
                "Check if vents are blocked or dusty - clean with compressed air",
                "Ensure the computer has adequate ventilation space",
                "Check Task Manager/Activity Monitor for programs causing high CPU usage",
                "Consider replacing thermal paste if the computer is several years old",
                "A failing fan may need replacement if cleaning doesn't help"
              ]
            },
            {
              title: "Beeping During Startup",
              content: "Beep codes indicate specific hardware problems. The pattern tells you what's wrong.",
              points: [
                "Count the number and pattern of beeps",
                "Look up your computer/motherboard manufacturer's beep code reference",
                "Common causes: RAM not seated properly, graphics card issues, or keyboard errors",
                "Try reseating RAM and expansion cards",
                "If beeping continues, consult a professional for hardware diagnosis"
              ]
            }
          ]
        },
        {
          title: "Can't Print",
          content: "Printer problems are common but usually have simple solutions.",
          points: [
            "Check if the printer is on and connected (USB or network)",
            "Ensure paper is loaded and there are no paper jams",
            "Check ink/toner levels",
            "Set the correct printer as default in your system settings",
            "Restart the print spooler service (Windows)",
            "Remove and re-add the printer in system settings",
            "Update or reinstall printer drivers from the manufacturer's website",
            "Try printing from a different program to rule out software issues",
            "Check if the printer works from another computer",
            "Ensure the printer is online and not in 'offline' or 'paused' mode"
          ],
          additionalInfo: "Many printer issues are driver-related. Always download drivers directly from the manufacturer's website."
        },
        {
          title: "Files Won't Open or Are Corrupted",
          content: "When you can't access your files, try these recovery methods.",
          points: [
            "Try opening the file with a different program",
            "Check if you have the necessary software installed to open that file type",
            "Look for backup or previous versions of the file",
            "Use File History (Windows) or Time Machine (Mac) to restore an earlier version",
            "Try file repair tools specific to the file type (Word repair for .docx, etc.)",
            "Check if the file is on a failing hard drive - run diagnostics",
            "Scan for malware that may have corrupted files",
            "If it's a cloud-synced file, check the web version for a clean copy",
            "As a last resort, try file recovery software"
          ],
          additionalInfo: "Regular backups prevent permanent data loss. If a file is truly corrupted and you have no backup, professional data recovery services may be your only option."
        }
      ]
    }
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.find(article => article.slug === slug)
}
