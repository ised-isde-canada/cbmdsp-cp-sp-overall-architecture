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
 * ServiceException
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2021-02-03T11:23:46.546156-05:00[America/Toronto]")

public class ServiceException   {
  @JsonProperty("code")
  private Integer code;

  @JsonProperty("message")
  private String message;

  @JsonProperty("ZuluDateTime")
  private String zuluDateTime;

  public ServiceException code(Integer code) {
    this.code = code;
    return this;
  }

  /**
   * Get code
   * @return code
  */
  @ApiModelProperty(example = "500", required = true, value = "")
  @NotNull


  public Integer getCode() {
    return code;
  }

  public void setCode(Integer code) {
    this.code = code;
  }

  public ServiceException message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
  */
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ServiceException zuluDateTime(String zuluDateTime) {
    this.zuluDateTime = zuluDateTime;
    return this;
  }

  /**
   * Get zuluDateTime
   * @return zuluDateTime
  */
  @ApiModelProperty(example = "2020-01-01", required = true, value = "")
  @NotNull


  public String getZuluDateTime() {
    return zuluDateTime;
  }

  public void setZuluDateTime(String zuluDateTime) {
    this.zuluDateTime = zuluDateTime;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ServiceException serviceException = (ServiceException) o;
    return Objects.equals(this.code, serviceException.code) &&
        Objects.equals(this.message, serviceException.message) &&
        Objects.equals(this.zuluDateTime, serviceException.zuluDateTime);
  }

  @Override
  public int hashCode() {
    return Objects.hash(code, message, zuluDateTime);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ServiceException {\n");
    
    sb.append("    code: ").append(toIndentedString(code)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    zuluDateTime: ").append(toIndentedString(zuluDateTime)).append("\n");
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

