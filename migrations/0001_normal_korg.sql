CREATE TABLE `visits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`fbclid` text,
	`gclid` text,
	`gad_source` text,
	`gbraid` text,
	`wbraid` text,
	`path` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `orders` ADD `gad_source` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `gbraid` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `wbraid` text;