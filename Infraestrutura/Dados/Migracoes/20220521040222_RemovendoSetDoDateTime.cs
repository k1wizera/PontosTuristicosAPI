using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraestrutura.Dados.Migracoes
{
    public partial class RemovendoSetDoDateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatadeInclusao",
                table: "PontosTuristicos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DatadeInclusao",
                table: "PontosTuristicos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
