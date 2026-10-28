FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["VOAM_questionario.csproj", "./"]
RUN dotnet restore "VOAM_questionario.csproj"

COPY . .
RUN dotnet publish "VOAM_questionario.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "VOAM_questionario.dll"]
