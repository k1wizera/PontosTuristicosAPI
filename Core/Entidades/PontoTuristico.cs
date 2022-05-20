using System.ComponentModel.DataAnnotations;

namespace Core.Entidades
{
    public class PontoTuristico
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O Título é obrigatório.")]
        public string Nome { get; set; }

        [MaxLength(100)]
        [Required(ErrorMessage = "A Descrição é obrigatória.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório.")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "O estado é obrigatório.")]
        public string Estado { get; set; }
    }
}
