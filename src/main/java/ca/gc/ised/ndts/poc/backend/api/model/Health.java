package ca.gc.ised.ndts.poc.backend.api.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.openapitools.jackson.nullable.JsonNullable;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * health kv pair
 */
@ApiModel(description = "health kv pair")
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2021-02-03T11:23:46.546156-05:00[America/Toronto]")

public class Health   {
  @JsonProperty("key")
  private String key = "";

  @JsonProperty("value")
  private String value = "";

  public Health key(String key) {
    this.key = key;
    return this;
  }

  /**
   * Get key
   * @return key
  */
  @ApiModelProperty(example = "123456789", value = "")


  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public Health value(String value) {
    this.value = value;
    return this;
  }

  /**
   * Get value
   * @return value
  */
  @ApiModelProperty(example = "1", value = "")


  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Health health = (Health) o;
    return Objects.equals(this.key, health.key) &&
        Objects.equals(this.value, health.value);
  }

  @Override
  public int hashCode() {
    return Objects.hash(key, value);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Health {\n");
    
    sb.append("    key: ").append(toIndentedString(key)).append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

