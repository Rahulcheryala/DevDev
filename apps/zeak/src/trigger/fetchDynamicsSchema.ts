import { registerTask } from "../taskRegistry";
import { logger } from "@trigger.dev/sdk/v3";
import { ensureValidAccessToken } from "~/utils/msalTokenHelper";
import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import path from "path";

async function writeEntitiesToFile(
  entities: any[],
  type: "EntityType" | "EntitySet",
) {
  try {
    const filePath = path.join(
      __dirname,
      `available_${type.toLowerCase()}s.txt`,
    );

    let content = `Available ${type}s (Total: ${entities.length})\n`;
    content += "=".repeat(50) + "\n\n";

    // Log the first few entities for debugging
    logger.info(`First few ${type}s:`, entities.slice(0, 3));

    if (type === "EntityType") {
      content += entities
        .map((entity) => {
          if (!entity || !entity.Name) {
            logger.warn("Invalid entity:", entity);
            return null;
          }
          return entity.Name;
        })
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .join("\n");
    } else {
      content += entities
        .map((set) => {
          if (!set || !set.Name || !set.EntityType) {
            logger.warn("Invalid entity set:", set);
            return null;
          }
          return `${set.Name} (Type: ${set.EntityType})`;
        })
        .filter((item): item is string => item !== null)
        .sort((a, b) => a.localeCompare(b))
        .join("\n");
    }

    fs.writeFileSync(filePath, content, "utf8");
    logger.info(`Written ${entities.length} ${type}s to ${filePath}`);
  } catch (error) {
    logger.error(`Error writing ${type}s to file:`, {
      error,
      entities: entities.slice(0, 5),
    });
  }
}

export const fetchDynamicsSchemaTask = registerTask({
  id: "fetch-dynamics-schema",
  name: "Fetch Dynamics Schema",
  description:
    "Fetches the schema of SalesOrderHeadersV2 table from Dynamics 365",
  priority: "High",
  createdBy: "System",
  isActive: true,

  run: async (payload: unknown, params: { ctx: any }) => {
    const { email } = payload as { email: string };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000);
    try {
      const tokenResponse = await ensureValidAccessToken(
        "yash.santani@xcelpros.com",
      );
      if (!tokenResponse) {
        throw new Error("Failed to get access token");
      }
      // Fetch metadata for SalesOrderHeadersV2
      console.log("Dynamics Base URL is: ", tokenResponse.dynamicsBaseUrl);
      const metadataUrl = `${tokenResponse.dynamicsBaseUrl}/data/$metadata`;
      const response = await fetch(metadataUrl, {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
          Accept: "application/xml",
        },
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.statusText}`);
      }

      const metadata = await response.text();
      //   console.log("Metadata is: ", metadata);
      // Parse the XML metadata to extract column information
      const columns = await parseMetadataXml(metadata, "CDSSalesOrderHeader");

      logger.info("Successfully fetched Dynamics schema", { columns });
      return columns;
    } catch (error) {
      logger.error("Error fetching Dynamics schema", { error });
      throw error;
    }
  },
});

async function parseMetadataXml(
  xml: string,
  entityName: string,
): Promise<string[]> {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
      removeNSPrefix: true,
      isArray: (name) => ["EntityType", "EntitySet", "Property"].includes(name),
      ignoreNameSpace: true,
      parseTagValue: false,
    });

    const result = parser.parse(xml);
    const schema = result?.Edmx?.DataServices?.Schema;

    if (!schema) {
      logger.error("Schema not found in XML");
      return [];
    }

    const schemas = Array.isArray(schema) ? schema : [schema];
    const entityTypes = schemas.flatMap((s) => {
      const types = s.EntityType || [];
      return Array.isArray(types) ? types : [types];
    });

    // Find all entities containing "SalesOrder" in their name
    const salesOrderEntities = entityTypes
      .filter((type) => type?.Name?.toLowerCase().includes("salesorder"))
      .map((type) => type.Name);

    logger.info("Found Sales Order related entities:", {
      count: salesOrderEntities.length,
      entities: salesOrderEntities,
    });

    // Find the requested entity with exact match first
    const entityType = entityTypes.find((type) => {
      const name = type?.Name;
      return (
        name === entityName ||
        name === `${entityName}V2` ||
        name === `${entityName}HeadersV2` ||
        name === `${entityName}HeaderV2` ||
        name === "CDSSalesOrderHeader" ||
        name === "CDSSalesOrderHeaderV2"
      );
    });

    if (!entityType) {
      logger.error(`Entity ${entityName} not found in schema`, {
        searchedFor: entityName,
        availableEntitiesCount: entityTypes.length,
        suggestedEntities: salesOrderEntities,
      });
      return [];
    }

    const properties = Array.isArray(entityType.Property)
      ? entityType.Property
      : entityType.Property
        ? [entityType.Property]
        : [];

    return properties.map((prop) => prop.Name).filter(Boolean);
  } catch (error) {
    logger.error("Error parsing XML:", {
      error,
      xmlStart: xml.substring(0, 1000),
    });
    return [];
  }
}
